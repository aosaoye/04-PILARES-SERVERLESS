import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  pill: {
    borderRadius: 9999,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillBtn: {
    height: 44,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  pillInput: {
    height: 50,
    borderRadius: 9999,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  grabHandle: {
    width: 44,
    height: 5,
    borderRadius: 9999,
    alignSelf: 'center',
    marginTop: 12,
  },
});
