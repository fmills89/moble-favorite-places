import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../util/database';

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    // using async helper func becayse fetchPlaces returns a promise
    // useEffect cannot be turned into async
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;

const styles = StyleSheet.create({});
