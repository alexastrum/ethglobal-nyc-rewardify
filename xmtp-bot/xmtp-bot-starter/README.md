# XMTP Bot Starter

#### Keeping the same address (the `KEY` environment variable)

By default, your bot will have a new address every time you start it up. That's ideal. If you have a private key, you can encode it to a hex string and set the `KEY` environment variable. Your bot will then use this key to connect to the network.

Don't know how to create a private key? Here's how to do it with ethers.js:

```typescript
import { Wallet } from "ethers";

const key = Wallet.createRandom().privateKey;
console.log("Set your environment variable: KEY=" + key);
```

### XMTP Environment (the `XMTP_ENV` environment variable)

By default, the bot connects to the `dev` network. If you want to connect to production, specify `XMTP_ENV=production`.
