const functions = require('firebase-functions')
var fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPushNotificationItens = functions.database.ref('itens/{id}').onCreate( async (event, context ) => {

    const id = event.val().userId
    const root = admin.database().ref('/users').once('value')
    var messages = []

    //return the main promise
    return root.then(function (snapshot){

        snapshot.forEach(function (childSnapshot) {

            var expoToken = childSnapshot.val().expoToken
            var userId    = childSnapshot.key

            console.log('userIdItem', id)
            console.log('userId', userId)
            console.log('Token', expoToken)

            if(userId !== id){
                if (expoToken) {

                    messages.push({
                        "to": expoToken,
                        "body": 
                        "Foram inseridas novas doações/necessidades! Corre lá no nosso App e confira! ;)"
                    })
                }
            }
        })

        return Promise.all(messages)

    }).then(messages => {

        fetch('https://exp.host/--/api/v2/push/send', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })

        return null
    })

})

exports.sendPushNotificationMatches = functions.database.ref('matches/{id}').onCreate( async (event, context) => {

    const userNotified = event.val().userNotified
    const root = admin.database().ref(`users/${userNotified}`).once('value')
    //const id = context.params.id
    //const root = admin.database().ref(`users/${id}`).once('value')
    var messages = []

    //console.log('Id', id)
    console.log('userNotified',userNotified)

    //return the main promise
    return root.then(function (snapshot){

        snapshot.forEach(function (childSnapshot) {

            console.log('ChildSnapshot', childSnapshot.val())

            var expoToken = childSnapshot.val()

            if (expoToken) {

                messages.push({
                    "to": expoToken,
                    "body": 
                      "Você tem um novo Match! Corre lá no nosso App e confira! ;)"
                })
            }
        })

        return Promise.all(messages)

    }).then(messages => {

        fetch('https://exp.host/--/api/v2/push/send', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })

        return console.log('No message for root:', root)
    })

})

exports.sendPushNotification = functions.database.ref('notifications/{id}').onCreate( async (event, context ) => {

    const title = event.val().title
    const bodyMessage = event.val().bodyMessage
    const root = admin.database().ref('/users').once('value')
    var messages = []

    //return the main promise
    return root.then(function (snapshot){

        snapshot.forEach(function (childSnapshot) {

            var expoToken = childSnapshot.val().expoToken
            
            console.log('Token', expoToken)

                if (expoToken) {

                    messages.push({
                        "to": expoToken,
                        "title": title,
                        "body": bodyMessage
                    })
                }
        })

        return Promise.all(messages)

    }).then(messages => {

        fetch('https://exp.host/--/api/v2/push/send', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })

        return null
    })

})