const ipfsLibrary = require('ipfs-http-client')
const ipfs = new ipfsLibrary({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

exports.add = async ({ files, user }) => {
    let User = await db.User.scope('withKeys').findOne({ where: { id: user.id } });
    if (!User) return { err: 'user not found', status: 404 }
    try {
        if(!files) {
            return 'No file uploaded';
        }else {
            const { path } =  await ipfs.add(files.recordFile.data.toString());
             return {
                data:path,
                message: 'user uploaded data successfully'
            }
        }
    } catch (error) {
        let { reason } = error;
        if (reason) return { err: reason, status: 422 };
        return { err: 'ipfs error', status: 500 }
    }
};


exports.cat = async ({ query,user }) => {
    const { hash } = query;
    let ipfsHash = await db.Data.findOne({ where: { ipfsHash: hash } });
    if (!ipfsHash) return { err: ' ipfsHash not found', status: 404 }
    let User = await db.User.scope('withKeys').findOne({ where: { id: user.id } });
    if (!User) return { err: 'user not found', status: 404 }
    try {
        const chunks = []
        for await (const chunk of ipfs.cat(hash)) {
          chunks.push(chunk)
        }
      return {
        data:Buffer.concat(chunks).toString(),
        message: 'downloaded successfully'
    }
  } catch (error) {
      let { reason } = error;
      if (reason) return { err: reason, status: 422 };
      return { err: 'ipfs error', status: 500 }
  }
};

