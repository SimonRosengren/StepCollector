var returnArray = [];

var test = function() {
  Object.keys(Keys).forEach(key => {
    test.key = {}
    $.post({
      contentType: "application/x-www-form-urlencoded",
      url: "https://www.googleapis.com/oauth2/v4/token",
      data: {
        client_id: Keys[key].client_id,
        client_secret: Keys[key].client_secret,
        refresh_token: Keys[key].refresh_token,
        grant_type: "refresh_token"
      },
      success: function(result) {
        $.post({
          contentType: "application/json",
          //contentType: "application/x-www-form-urlencoded",
          url:
            "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
          beforeSend: function(request) {
            request.setRequestHeader(
              "Authorization",
              "Bearer " + result.access_token
            );
          },
          data: JSON.stringify({
            aggregateBy: [
              {
                dataTypeName: "com.google.step_count.delta",
                dataSourceId:
                  "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
              }
            ],
            bucketByTime: { durationMillis: 86400000 },
            startTimeMillis: 1524434400000,
            endTimeMillis: Date.now()
          }),
          success: function(result) {
            result.bucket.forEach(function(element) {
              returnArray.push({name: key, steps: element.dataset[0].point[0].value[0].intVal});
            });
            return returnArray
          }
        });
      }
    });
  });
}
