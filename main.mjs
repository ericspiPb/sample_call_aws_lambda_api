import axios from 'axios'
import { aws4Interceptor } from "aws4-axios";
import { readFile } from 'fs/promises'


const interceptor = aws4Interceptor({
        region: "us-east-1",
        service: "lambda",
    },
    {
        getCredentials: async () => {
            return Promise.resolve({
                accessKeyId: "iam_accessKeyId",
                secretAccessKey: "iam_secretAccessKey",
            })
        }
    }
);

axios.interceptors.request.use(interceptor);

const path = `./R2G2.jpeg`

readFile(path, 'base64').then(async (base64_image) => {
    axios.post("https://lambda-url-id.lambda-url.us-east-1.on.aws", {
        base64: base64_image
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.error(err)
    });
}).catch(x => {
    console.log(x)
})
