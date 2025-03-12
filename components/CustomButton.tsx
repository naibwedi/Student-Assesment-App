import React from 'react';
import { Button, StyleSheet, ViewStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, color = '#007AFF', style }) => (
  <Button
    title={title}
    onPress={onPress}
    color={color}
    style={[styles.button, style]}
  />
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default CustomButton;
