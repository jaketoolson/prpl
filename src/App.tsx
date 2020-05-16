import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {Provider as ApplicationProvider, Card, Text, Button} from 'react-native-paper';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation,useRoute} from '@react-navigation/native';

interface UserModelInterface {
  id: number;
  image: ImageSourcePropType;
  name: string;
  status: statusEnum;
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
  },
  page: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
  },
  individualCard: {
    borderWidth: 2,
    marginBottom: 10
  },
  individualProfileCard: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
});

enum statusEnum {
  DANGER = 0,
  WARNING = 1,
  OK = 3
}

const statusColorMap = new Map<statusEnum, string>([
  [statusEnum.DANGER, 'red'],
  [statusEnum.WARNING, 'orange'],
  [statusEnum.OK, 'green']
]);

let data: UserModelInterface[] = [
  {
    id: 1,
    image: require('./../assets/images/people/bert.jpg'),
    name: 'Bert',
    status: statusEnum.WARNING,
  },
  {
    id: 2,
    image: require('./../assets/images/people/bigbird.jpg'),
    name: 'Big Bird',
    status: statusEnum.DANGER,
  },
  {
    id: 3,
    image: require('./../assets/images/people/cookiemonster.jpg'),
    name: 'Cookie Monster',
    status: statusEnum.DANGER,
  },
  {
    id: 4,
    image: require('./../assets/images/people/elmo.jpg'),
    name: 'Elmo',
    status: statusEnum.OK,
  },
  {
    id: 5,
    image: require('./../assets/images/people/ernie.jpg'),
    name: 'Ernie',
    status: statusEnum.DANGER,
  },
  {
    id: 6,
    image: require('./../assets/images/people/grover.jpg'),
    name: 'Grover',
    status: statusEnum.OK,
  },
  {
    id: 7,
    image: require('./../assets/images/people/oscar.jpg'),
    name: 'Oscar',
    status: statusEnum.OK,
  },
];

function ProfileCardComponent(item: UserModelInterface) {
  const navigation = useNavigation();
  const style = {...styles.individualCard, borderColor: statusColorMap.get(item.status)};
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('User', {user: item})}>
      <View>
        <Card style={style}>
          <Card.Cover source={item.image} />
        </Card>
      </View>
    </TouchableOpacity>
  );
}

const renderList = ({item}: {item: UserModelInterface}) => (
  <ProfileCardComponent id={item.id} name={item.name} image={item.image} status={item.status} />
);

function IndividualProfileCardComponent(){
  const route = useRoute();
  const navigation = useNavigation();
  const {user}: any = route.params;
  const foundUser:UserModelInterface | undefined = data.find(({id}) => id === user.id);
  if (!foundUser) {
    throw new Error(`User not found: ${user}`);
  }
  navigation.setOptions({
    title: foundUser.name
  });
  
  return (
    <View style={styles.page}>
      <View style={styles.individualProfileCard}>
        <Text>{foundUser.name}</Text>
        <Text>{statusEnum[foundUser.status]}</Text>
        <Button onPress={() => foundUser.status = statusEnum.DANGER}>Red</Button>
        <Button onPress={() => console.log('Yellow')}>Yellow</Button>
        <Button onPress={() => console.log('Green')}>Green</Button>
      </View>
    </View>
  );
}

const ProfileListComponent = () => (
  <View style={styles.page}>
    <FlatList
      data={data}
      renderItem={renderList}
      keyExtractor={(item: any) => item.id.toString()}
    />
  </View>
);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
  padding: 10,
};

const App = () => (
  <ApplicationProvider>
    <SafeAreaView style={styles.body}>
      <NavigationContainer theme={MyTheme}>
        <Animated.View style={styles.innerContainer}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Team" component={ProfileListComponent} />
            <Stack.Screen name="User" component={IndividualProfileCardComponent} />
          </Stack.Navigator>
        </Animated.View>
      </NavigationContainer>
    </SafeAreaView>
  </ApplicationProvider>
);

export default App;
