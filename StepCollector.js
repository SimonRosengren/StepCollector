
$.post({
    contentType: "application/x-www-form-urlencoded",
    url: 'https://www.googleapis.com/oauth2/v4/token',
    data: {
        client_id: Keys.Martin.client_id,
        client_secret: Keys.Martin.client_secret,
        refresh_token: Keys.Martin.refresh_token,
        grant_type: 'refresh_token'
    },
    success: function (result) {
        $.post({
            contentType: "application/json",
            url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            authorization: "Bearer " + JSON.stringify(result.access_token),
            data: {
                "aggregateBy": [{ "dataTypeName": "com.google.step_count.delta", "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps" }],
                "bucketByTime": { "durationMillis": 86400000 },
                "startTimeMillis": 1524434400000, "endTimeMillis": Date.now()
            },
            success: function(result) {
                console.log(JSON.stringify(result))
            }
        })
    }
})
