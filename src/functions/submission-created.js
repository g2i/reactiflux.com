module.exports = {
  handler: (event, context, cb) => {
    const body = JSON.parse(event.body);
    fetch(
      'https://discordapp.com/api/webhooks/639999623183728689/hBo-wIhk4JlaclD1_cPIeC_uW7NhOOl9Y_IcAP2Ne1GNY6J6NDYJm36EwxfEO5ZVf3Zs',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: body.message }),
      },
    );
    cb(null, { statusCode: 200, body: 'ok' });
  },
};
