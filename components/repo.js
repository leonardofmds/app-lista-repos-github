import React, { Component } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class Repo extends Component {
    render() {
        return (
            <View style={styles.repo}>
                <TouchableOpacity onPress={() => { this.props.onLink(this.props.data.authorUrl) }}>
                    <Image
                        style={styles.repoImage}
                        source={{ uri: this.props.data.thumbnail }}
                    />
                </TouchableOpacity>
                <View style={styles.repoInfo}>
                    <TouchableOpacity onPress={() => { this.props.onLink(this.props.data.repoUrl) }}>
                        <Text style={styles.repoTittle}> {this.props.data.tittle} </Text>
                    </TouchableOpacity>
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
        flex: 1,
        flexWrap: 'wrap',
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
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
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
        fontSize: 14,
        fontWeight: 'bold',
    },
    deleteButtonContainer:
    {

    },
});