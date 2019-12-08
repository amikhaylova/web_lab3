import javax.faces.bean.ManagedBean;

@ManagedBean(name = "helloWorld", eager = true)
public class Hello {
    public Hello() {
        System.out.println("HelloWorld started!");
    }

    public String getMessage() {
        return "Hello World!";
    }

    public String getNewMessage() {
        return "Hello World!!!!";
    }

}
