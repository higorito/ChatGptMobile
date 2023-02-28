import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestion = () => {
    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: question + '\n',
      max_tokens: 150,
      temperature: 0.5,
      top_p: 1,
      n: 1
      
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    })
    .then(response => {
      setAnswer(response.data.choices[0].text);
    })
    .catch(error => {
      Alert.alert('Error', error.message);
    });
  };

  return (
    <View style={{ padding: 20, backgroundColor:"#dcdcdc", }}>
      <Text style={{ fontSize: 30, marginBottom: 20, padding:30, fontWeight: 'bold' }}>Google Paraguai </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Digite sua pergunta"
        value={question}
        onChangeText={text => setQuestion(text)}
      />
      <TouchableOpacity
        title="Pergunte"
        onPress={handleQuestion}
        style={{alignItems:'center', backgroundColor: 'green', borderRadius: 25, marginHorizontal: '33%', paddingHorizontal:20,paddingVertical:10 }}
      ><Text style={{color:"#fff"}}>Pergunte</Text></TouchableOpacity>

      { answer !== '' && (
        <View style={{ marginTop: 20}}>
          <Text style={{ fontSize: 20 }}>Resposta:</Text>
          <View style={{backgroundColor: "#fff"}}>
          <Text style={{ fontSize: 15, marginBottom: 20}}>{answer}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
