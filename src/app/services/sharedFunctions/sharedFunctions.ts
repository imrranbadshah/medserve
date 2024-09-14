import { isPlatformBrowser } from "@angular/common";
import * as forge from "node-forge";
import * as pako from 'pako';


/**
 * @description Used to get IP addr from localStorage
 */
export function getIpaddress(platformId: any) {
    if (isPlatformBrowser(platformId)) {
        return JSON.parse(localStorage.getItem('ipobject') as string);
    }
    else {
        return {}
    }
}

/**
 * @description used to encrypt
 * @param keys 
 * @param value 
 * @returns 
 */
export function encrypt(keys: string, value: any) {
    try {
        var textEncoder = new TextEncoder(); //similar to buffer in node js
        var iv = '1234567891234567';
        var md = forge.md.sha256.create();//create sha 256 hash
        md.update(keys);
        var key = md.digest();
        var encodedData = textEncoder.encode(JSON.stringify(value)); //stringify to json and convert to buffer
        var gzippedData = pako.gzip(encodedData); //compress
        var cipher = forge.cipher.createCipher('AES-CBC', key);//pad7 by default :)
        cipher.start({ iv: iv });
        cipher.update(forge.util.createBuffer(gzippedData));
        cipher.finish();
        var encrypted = cipher.output;
        return { data: forge.util.encode64(encrypted.data) }
    }
    catch (err) {
        console.log(err)
        return null
    }
}

/**
 * @description used for decryptions
 */
export function decrypt(keys: string, value: any) {
    try {
        var textDecoder = new TextDecoder();
        var iv = '1234567891234567'; // Ensure this is the correct IV

        // Generate the key
        var md = forge.md.sha256.create();
        md.update(keys);
        var key = md.digest();

        // Decode the base64 encrypted value
        var encryptedBytes = forge.util.decode64(value);

        // Create the decipher
        var decipher = forge.cipher.createDecipher('AES-CBC', key);
        decipher.start({ iv: iv });

        // Decrypt in chunks
        var length = encryptedBytes.length;
        var chunkSize = 1024 * 64;
        var index = 0;
        var decrypted = '';
        do {
            var buf = forge.util.createBuffer(encryptedBytes.substr(index, chunkSize));
            decipher.update(buf);
            index += chunkSize;
        } while (index < length);

        var result = decipher.finish();
        if (result) {
            decrypted = decipher.output.getBytes();
        } else {
            throw new Error('Decryption failed');
        }

        // Convert decrypted bytes to Uint8Array for pako.ungzip
        var decryptedUint8Array = new Uint8Array(forge.util.binary.raw.decode(decrypted));

        // Decompress and decode the data
        var decodedData = pako.ungzip(decryptedUint8Array);
        var dataObject = JSON.parse(textDecoder.decode(decodedData));
        return dataObject;
    }
    catch (err) {
        console.log(err);
        return value;
    }
}