$.ajax({
    contentType: "application/json",
    url: 'https://www.googleapis.com/oauth2/v4/token',
    data: {
        client_id: '123038229909-uj34ag7klfjgioc0mksh5qeq3mi5sdq9.apps.googleusercontent.com',
        client_secret: 'o7pDIifIQqzx4Mq3o-_LVp3R',
        refresh_token: '1/-5Un3s4ranjnpF7bumycvcx91KCiREK6JALiZyB8e9Y6-NfPtkbYpfyMlkNkeNYf',
        grant_type: 'refresh_token'
    },
    success: function(status, result) {
        $( "#text-output" ).html( "<strong>" + result + "</strong> degrees" );
    }
})