import React, {useEffect, useState} from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import {styles} from '../../css/add/challenge/Style';
import {BACKEND_URL} from '@env';
import axios from "axios";

function RecommendChallenge({updateInputs, setRecMessage}): JSX.Element {

  const [load, setLoad] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [suggestedExercises, setSuggestedExercises] = useState([]);
  const [ButtonText, setButtonText] = useState('Recommend Challenge');


  const calculateDueDate = function(exercise){
    let issueDate = new Date(exercise.issueDate).valueOf();
    let originalDueDate = new Date(exercise.dueDate).valueOf();
    let dueDate = new Date(new Date().getTime() + (originalDueDate - issueDate));
    return dueDate;
  }


  const recreateChallengeData = function(exercise, amount){
    let data = {
      exerciseName : exercise.exercise.exerciseName,
      amount : amount,
      unit : exercise.exercise.unit,
      issueDate : new Date(),
      dueDate : calculateDueDate(exercise),
    }
    return data;
  }

  const createExercise = function(exercise){
    let progressPercent = exercise.progress/exercise.exercise.convertedAmount;
    var suggestion = {"data":{}, "message":""};


    if(progressPercent >= 1){
      suggestion.data =  recreateChallengeData(exercise, Math.round(exercise.exercise.amount * 1.1));
      suggestion.message = "This challenge reflects on one you have already completed. See if you can go a little further!";
    }
    else if(progressPercent >= .9){
      suggestion.data = recreateChallengeData(exercise, exercise.exercise.amount);
      suggestion.message = "You were so close last time!";
    }
    else if(Math.round(progressPercent * exercise.exercise.amount)>0){
      suggestion.data = recreateChallengeData(exercise, Math.round(progressPercent * exercise.exercise.amount))
      suggestion.message =  "You can do this!";
    }

    return suggestion;

  }

  const createExerciseList = function(response){
    var results = [];
    for(let i = 0; i<response.length; i++){
        let result = createExercise(response[i]);
        if (result.message.length > 0){
            results.push(result);
        }
    }
    setSuggestedExercises(results);
  }


  const getPastChallenges = function(){
  var config = {
    method: 'post',
    url: BACKEND_URL + 'stats/get_past_challenges',
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include'
    };

    axios(config)
      .then(function (response) {
          createExerciseList(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
  }


  useEffect(
    () => {
        if (!load) {
            setLoad(true);
            getPastChallenges();
        }
    }, [load]
  );



  const handleRecommendPress = function(){
      if (suggestedExercises.length === 0) {
        updateInputs("NA");
        setRecMessage("We do not currently have enough data to recommend a challenge.");
        return;
      }
      console.log(suggestedExercises);
      setRecMessage(suggestedExercises[exerciseIndex].message);
      updateInputs(suggestedExercises[exerciseIndex].data);
      setExerciseIndex((exerciseIndex + 1) % suggestedExercises.length);

  }

  return(
  <View style = {styles.RecommendChallengeContainer}>
    <TouchableHighlight
          style={styles.RecommendButton}
          onPress={handleRecommendPress}
          underlayColor = '#013319'
          >
          <Text style={styles.IssueChallengeText}>
              {ButtonText}
          </Text>
    </TouchableHighlight>

  </View>
)
}

export default RecommendChallenge