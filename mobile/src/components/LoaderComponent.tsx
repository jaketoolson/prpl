import React from 'react';
import {StyleSheet, Easing, Animated, View} from 'react-native';

export interface LoaderComponentProps {
  loading: boolean;
}

const timing = 800;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export class LoaderComponent extends React.Component<LoaderComponentProps> {
  public static defaultProps: LoaderComponentProps = {loading: true};
  spinValue = new Animated.Value(0);

  public componentDidMount(): void {
    this.spin();
  }

  public spin(): void {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: timing,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.spin());
  }

  public render(): React.ReactNode {
    const loading = this.props.loading;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      loading && (
        <Animated.View style={styles.outerContainer}>
          <View style={styles.imageContainer}>
            <Animated.Image
              style={{
                width: 120,
                height: 120,
                transform: [{rotate: spin}],
              }}
              source={require('./../../assets/loader.png')}
            />
          </View>
        </Animated.View>
      )
    );
  }
}
