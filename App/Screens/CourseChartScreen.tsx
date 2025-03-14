import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebaseConfig";

const letterGradeValue: { [key: string]: number } = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2,
  "F": 1,
};

const CourseChartScreen = () => {
  const route = useRoute();
  const { courseId } = route.params as { courseId: string };

  // For letter-grade distribution [A,B,C,D,F]
  const [gradeCounts, setGradeCounts] = useState([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseGrades = async () => {
      try {
        // "courses/{courseId}/grades" subcollection
        const gradesCollection = collection(db, `courses/${courseId}/grades`);
        const snapshot = await getDocs(gradesCollection);

        // Initialize distribution counters
        const newGradeCounts = [0, 0, 0, 0, 0];

        snapshot.forEach((doc) => {
          const grade = doc.data().grade; // e.g. "A", "B"
          if (grade === "A") newGradeCounts[0]++;
          else if (grade === "B") newGradeCounts[1]++;
          else if (grade === "C") newGradeCounts[2]++;
          else if (grade === "D") newGradeCounts[3]++;
          else if (grade === "F") newGradeCounts[4]++;
        });

        setGradeCounts(newGradeCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course grades:", error);
      }
    };

    fetchCourseGrades();
  }, [courseId]);

  if (loading) {
    return <Text>Loading Grade Distribution...</Text>;
  }

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: ["A", "B", "C", "D", "F"],
          datasets: [{ data: gradeCounts }],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#f4f4f4",
          backgroundGradientFrom: "#f4f4f4",
          backgroundGradientTo: "#f4f4f4",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        }}
      />
    </View>
  );
};

export default CourseChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
