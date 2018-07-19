import React, { Component } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class Repo extends Component {
    render() {
        return (
            <View style={styles.repo}>
                <Image
                    style={styles.repoImage}
                    source={{ uri: this.props.data.thumbnail }}
                />
                <View style={styles.repoInfo}>
                    <Text style={styles.repoTittle}> {this.props.data.tittle} </Text>
                    <Text style={styles.repoAuthor}> {this.props.data.author} </Text>
                </View>

                <View style={styles.deleteButtonContainer}>
                    <TouchableOpacity onPress={() => {
                       this.props.onRemove(this.props.data.id);
                    }}>
                        <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>



            </View>
        );
    }
}
const styles = StyleSheet.create({
    repo:
    {
        flex:1,
        flexWrap:'wrap',
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    repoImage:
    {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    repoInfo:
    {
        marginLeft: 20,
        alignItems:'flex-start',
    },
    repoTittle:
    {
        fontWeight: 'bold',
        color: '#333',

    },
    repoAuthor:
    {
        fontSize: 12,
        color: '#999',
    },
    deleteButtonText:
    {
        fontSize:14,
        fontWeight: 'bold',
        //backgroundColor:'#CCC',
    },
    deleteButtonContainer:
    {
        //flexDirection:'row',
        //justifyContent:'flex-end',
        //backgroundColor:'#CCC',
    },
});