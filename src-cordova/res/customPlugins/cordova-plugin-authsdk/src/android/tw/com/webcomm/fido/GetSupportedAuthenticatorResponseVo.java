package tw.com.webcomm.fido;

import java.util.List;

public class GetSupportedAuthenticatorResponseVo {

    private String aaid;
    private String keyID;
    private int code;
    private String message;
    private List<String> userVerifications;

    public String getAaid() {
        return aaid;
    }

    public void setAaid(String aaid) {
        this.aaid = aaid;
    }

    public String getKeyID() {
        return keyID;
    }

    public void setKeyID(String keyID) {
        this.keyID = keyID;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getUserVerifications() {
        return userVerifications;
    }

    public void setUserVerifications(List<String> userVerifications) {
        this.userVerifications = userVerifications;
    }
}
