import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  Provider as ApplicationProvider,
  Card,
  Text,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

interface UserModelInterface {
  id: number;
  image: ImageSourcePropType;
  name: string;
  status: statusEnum;
}

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
    borderWidth: 4,
    marginBottom: 10,
  },
  individualProfileCard: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  modal: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
  padding: 10,
};

enum statusEnum {
  DANGER = 0,
  WARNING = 1,
  OK = 3,
  NEUTRAL = 4,
}

const statusColorMap = new Map<statusEnum, string>([
  [statusEnum.DANGER, 'red'],
  [statusEnum.WARNING, 'orange'],
  [statusEnum.OK, 'green'],
  [statusEnum.NEUTRAL, 'gray'],
]);

let DATA: UserModelInterface[] = [
  {
    id: 1,
    image: require('./../assets/images/people/bert.jpg'),
    name: 'Bert',
    status: statusEnum.NEUTRAL,
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
    status: statusEnum.WARNING,
  },
  {
    id: 7,
    image: require('./../assets/images/people/oscar.jpg'),
    name: 'Oscar',
    status: statusEnum.OK,
  },
];

const Stack = createStackNavigator();
const TeamContext = React.createContext([{}, () => {}]);

function ProfileCardComponent(item: UserModelInterface) {
  const navigation = useNavigation();
  const style = {
    ...styles.individualCard,
    borderColor: statusColorMap.get(item.status),
  };
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

const renderProfileCard = ({item}: {item: UserModelInterface}) => (
  <ProfileCardComponent
    id={item.id}
    name={item.name}
    image={item.image}
    status={item.status}
  />
);

function IndividualProfileCardComponent() {
  const [state, setState]: any = useContext(TeamContext);
  const route = useRoute();
  const navigation = useNavigation();
  const {user}: any = route.params;
  const index: number = state.findIndex(
    ({id}: UserModelInterface) => id === user.id,
  );
  const foundUser: UserModelInterface = state[index];
  navigation.setOptions({
    title: foundUser.name,
  });
  const updateStatus = (status: statusEnum) => {
    setState((s: UserModelInterface[]) => {
      s[index].status = status;
      return [...s];
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.individualProfileCard}>
        <Text>{foundUser.name}</Text>
        <Text>{statusEnum[foundUser.status]}</Text>
        <Button
          disabled={foundUser.status === statusEnum.NEUTRAL}
          onPress={() => updateStatus(statusEnum.NEUTRAL)}>
          Neutral
        </Button>
        <Button
          disabled={foundUser.status === statusEnum.DANGER}
          onPress={() => updateStatus(statusEnum.DANGER)}>
          Danger
        </Button>
        <Button
          disabled={foundUser.status === statusEnum.WARNING}
          onPress={() => updateStatus(statusEnum.WARNING)}>
          Warning
        </Button>
        <Button
          disabled={foundUser.status === statusEnum.OK}
          onPress={() => updateStatus(statusEnum.OK)}>
          Ok
        </Button>
      </View>
    </View>
  );
}

function ProfileListComponent({navigation}: any) {
  const [team]: any = useContext(TeamContext);
  const [modal, setModal] = useState(false);
  const [filteredData, setFilteredData] = useState(team);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => setModal(true)}>Filter</Button>,
    });
  });
  useEffect(() => {
    setFilteredData(team);
  }, [team]);
  const filterDataByStatus = (status: statusEnum) => {
    setFilteredData(team.filter((m: any) => m.status === status));
    setModal(false);
  };
  const resetFilteredData = () => {
    setFilteredData(team);
    setModal(false);
  };
  return (
    <View style={styles.page}>
      <Portal>
        <Modal visible={modal}>
          <View style={styles.modal}>
            <Button onPress={() => filterDataByStatus(statusEnum.OK)}>
              OK
            </Button>
            <Button onPress={() => filterDataByStatus(statusEnum.WARNING)}>
              Warning
            </Button>
            <Button onPress={() => filterDataByStatus(statusEnum.DANGER)}>
              Danger
            </Button>
            <Button onPress={() => filterDataByStatus(statusEnum.NEUTRAL)}>
              Neutral
            </Button>
            <Button onPress={() => resetFilteredData()}>Reset</Button>
            <Button onPress={() => setModal(false)}>Close</Button>
          </View>
        </Modal>
      </Portal>
      <FlatList
        data={filteredData}
        renderItem={renderProfileCard}
        keyExtractor={(item: UserModelInterface) => item.id.toString()}
        extraData={team}
      />
    </View>
  );
}

const App = () => {
  const [state, setState] = useState(DATA);
  return (
    <ApplicationProvider>
      <SafeAreaView style={styles.body}>
        <NavigationContainer theme={MyTheme}>
          <Animated.View style={styles.innerContainer}>
            <TeamContext.Provider value={[state, setState]}>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Team" component={ProfileListComponent} />
                <Stack.Screen
                  name="User"
                  component={IndividualProfileCardComponent}
                />
              </Stack.Navigator>
            </TeamContext.Provider>
          </Animated.View>
        </NavigationContainer>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default App;
