import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';

// using route object to then use useeffect to fetch data for
// specific place on load
function PlaceDetails({ route }) {
  function showOnMapHandler() {}

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // use selectedPlaceId to fetch data for a single place
  }, [selectedPlaceId]);

  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationConatiner}>
        <View style={styles.addressContatiner}>
          <Text style={styles.address}>ADDRESS</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContatiner: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
