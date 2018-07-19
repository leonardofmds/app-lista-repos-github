import React, { Component } from 'react';

import {
    View,
    Text,
    Modal,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';


export default class NewRepoModal extends Component {

    _testSubmit = async (did) => 
    {
        const q = await did;
        if(q===true)
            this.setState({ newRepoText: '' });

    }

    state =
        {
            newRepoText: '',
        };
    render() {
        return (
            <Modal animationType='fade' transparent={true} visible={this.props.visible} onRequestClose={() => { }} >
                <View style={styles.modalContainer}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTittle}>Adicionar repositório</Text>
                        <TextInput id='repoText'
                            autoFocus
                            autoCapitalize="none"
                            style={styles.boxInput}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder='owner/repositorio'
                            value={this.state.newRepoText}
                            onChangeText={newRepoText => this.setState({ newRepoText })}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => {
                                    this.props.onCancel();
                                    this.setState({ newRepoText: '' });
                                }}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={() => {
                                    this._testSubmit(this.props.onAdd(this.state.newRepoText));
                                    //this.setState({ newRepoText: '' });
                                }}
                            >
                                <Text style={styles.buttonText}>Adicionar</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={styles.pesquisarContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.pesquisarButton]}
                                onPress={() => {
                                    Linking.openURL(`https://github.com/search?q=${this.state.newRepoText}`);
                                    this.setState({ newRepoText: '' });
                                }}
                            >
                                <Text style={styles.buttonText}>Pesquisar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create(
    {
        modalContainer:
        {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,7)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        boxContainer:
        {
            padding: 20,
            backgroundColor: '#FFF',
            borderRadius: 10,
            alignItems: 'center',
            width: 280,
        },
        boxTittle:
        {
            fontWeight: 'bold',
            fontSize: 16,
        },
        boxInput:
        {
            alignSelf: 'stretch',
            marginTop: 10,
            paddingVertical: 0,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: '#DDD',
            height: 40,
            borderRadius: 3,
        },
        buttonContainer:
        {
            marginTop: 10,
            height: 40,
            flexDirection: 'row',
        },
        button:
        {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
        },
        cancelButton:
        {
            backgroundColor: '#E25F5F',
            marginRight: 5,
        },

        submitButton:
        {
            backgroundColor: '#70BD85',
            marginLeft: 5,
        },

        buttonText:
        {
            fontWeight: 'bold',
            color: '#FFF',
            fontSize: 12,
        },
        pesquisarContainer:
        {
            marginTop: 10,
            height: 40,
            flexDirection: 'row',
        },
        pesquisarButton:
        {
            backgroundColor: '#333',
        },
    }
)