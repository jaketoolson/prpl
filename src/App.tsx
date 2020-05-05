import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  FlatList,
  SafeAreaView,
  ImageSourcePropType,
} from 'react-native';
import {
  Provider as ApplicationProvider,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';

interface UserModelInterface {
  id: number;
  image: ImageSourcePropType;
  name: string;
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    padding: 16,
    paddingBottom: 48,
  },
});

const data: UserModelInterface[] = [
  {
    id: 1,
    image: require('./../assets/images/people/bert.jpg'),
    name: 'Bert',
  },
  {
    id: 2,
    image: require('./../assets/images/people/bigbird.jpg'),
    name: 'Big Bird',
  },
  {
    id: 3,
    image: require('./../assets/images/people/cookiemonster.jpg'),
    name: 'Cookie Monster',
  },
  {
    id: 4,
    image: require('./../assets/images/people/elmo.jpg'),
    name: 'Elmo',
  },
  {
    id: 5,
    image: require('./../assets/images/people/ernie.jpg'),
    name: 'Ernie',
  },
  {
    id: 6,
    image: require('./../assets/images/people/grover.jpg'),
    name: 'Grover',
  },
  {
    id: 7,
    image: require('./../assets/images/people/oscar.jpg'),
    name: 'Oscar',
  },
];

class ProfileCardComponent extends React.Component<UserModelInterface> {
  public render(): React.ReactNode {
    return (
      <Card style={{marginBottom: 16}}>
        <Card.Cover source={this.props.image} />
        <Card.Content>
          <Title>{this.props.name}</Title>
          <Paragraph>{this.props.name}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

const renderList = ({item}: {item: UserModelInterface}) => (
  <ProfileCardComponent id={item.id} name={item.name} image={item.image} />
);

const App = () => (
  <ApplicationProvider>
    <ImageBackground
      source={require('./../assets/images/bg.jpg')}
      style={styles.bg}>
      <SafeAreaView style={styles.outerContainer} />
      <View style={styles.innerContainer}>
        <FlatList
          data={data}
          renderItem={renderList}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </ImageBackground>
  </ApplicationProvider>
);

export default App;
