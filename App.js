/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  Linking,
} from 'react-native';

import Repo from './components/repo';
import NewRepoModal from './components/NewRepoModal';

export default class App extends Component {
  state = {
    modalVisible: false,
    repos: [],

  };

  async componentDidMount()
  {
    const repos = JSON.parse(await AsyncStorage.getItem('@Minicurso:repositories')) || [];

    this.setState({repos});
  }

  _link = (url) =>
  {
    Linking.openURL(url);
  }

  _removeRepository = async (repoId) =>
  {

    
    let repos = this.state.repos;

    for(var i = 0; i< repos.length; i++)
    {
      if(repos[i].id === repoId)
      {
        repos.splice(i,1);
      }
    }

    this.setState({repos}); 

    await AsyncStorage.setItem('@Minicurso:repositories',JSON.stringify(this.state.repos));
  }

  _addRepository = async (newRepoText) => 
  {
    try{
      const repoCall = await fetch(`http://api.github.com/repos/${newRepoText}`);

      const response = await repoCall.json(); 

    if(this.state.repos.find(rep=> rep.id===response.id))
    {
      alert('Repositorio já adicionado');
      return;
    }

    const repository =
    {
      id: response.id, 
      thumbnail: response.owner.avatar_url,
      tittle: response.name,
      author: response.owner.login,
      repoUrl: response.html_url,
      authorUrl: response.owner.html_url,
    };

    this.setState(
      {
        modalVisible:false,
        repos:
        [
          ...this.state.repos,
          repository,
        ],
      }
    )

    await AsyncStorage.setItem('@Minicurso:repositories',JSON.stringify(this.state.repos));

    }
    catch(error)
    {
      alert('Repositório Inválido');
      return false;
    }
      
  };

  _delStorage = async () =>
  {
    await AsyncStorage.removeItem(('@Minicurso:repositories')); 
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}> 
              <Text style = {styles.headerText}> Repositórios Favoritos Github xD </Text>
              <TouchableOpacity onPress={() => 
              {
                this.setState({modalVisible:true})       
              }}>
              <Text style={styles.headerButton}>+</Text> 
              </TouchableOpacity> 
          </View>

          <ScrollView contentContainerStyle={styles.repoList}>
            { this.state.repos.map( repo => <Repo key={repo.id} onLink={this._link} onRemove={this._removeRepository} data= {repo}/>)}
          </ScrollView>

          <NewRepoModal 
          onCancel={()=> this.setState({modalVisible:false})} 
          onAdd={this._addRepository}
          visible={this.state.modalVisible}/>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#333',
  },
  header:
  {
    height:(Platform.OS==='ios') ? 70 : 50,
    paddingTop:(Platform.OS==='ios') ? 20 : 0,
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20,
  },
  headerButton:
  {
    fontSize:24,
    fontWeight:'bold',

  },
  headerText:
  {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  repoList:
  {
    padding:20,
  },
});
