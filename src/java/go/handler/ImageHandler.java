package go.handler;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

public class ImageHandler {

    public String base64Encode(File f) throws FileNotFoundException, IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        InputStream is = new FileInputStream(f);
        byte[] bytes = null;
        byte[] buffer = new byte[(int) f.length()];
        String base64Image = null;
        int bytesRead = -1;
        while ((bytesRead = is.read(buffer)) != -1) {
            os.write(buffer, 0, bytesRead);
        }
        bytes = os.toByteArray();
        Base64.Encoder en = Base64.getEncoder();
        base64Image = en.encodeToString(bytes);
        is.close();
        return base64Image;
    }
}