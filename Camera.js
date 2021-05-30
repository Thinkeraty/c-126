import * as React from 'react'
import { Button, Image, View, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class PickImage extends React.Component {
    this.state = {
        image: null
    }

    render(){
        
        let { image } = this.state
        return(
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button
                title="Pick an image from camera roll"
                onPress={this._pickImage}
                />
            </View>
        )
    }

    componentDidMount() { 
        this.getPermissionAsync()
    }

    getPermissionAsync = () => {
        if (Platform.OS !== 'web') { 
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== 'granted') {
                alert('Permissions Needed')
            }
        }
    }
}

    uploadImage = async () => {
        const data = new FormData()
        let filename = uri.split("/")[uri.split("/").length  - 1]
        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`
        const fileToUpload = {
            uri: uri,
            name: name,
            type: type
        };
        data.append("digit", fileToUpload);
        fetch('https://f292a3137990.ngrok.io/predict-digit', {
            method: 'POST',
            body: data,
            headers: {
                "content-type": "multipart/form-data",
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success', result);
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypesOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            })
            if (!result.cancelled) { 
                this.setStatus({ image: result.data })
                console.log(result.url
                this.uploadImage(result.uri))
            }
        } catch (e) { 
            console.log(e)
        }
    }