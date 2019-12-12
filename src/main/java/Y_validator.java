import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator(value = "Y_validator")
public class Y_validator implements Validator {
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        try {
            double parsedValue = Double.parseDouble(o.toString());
            if (!(parsedValue > -3 && parsedValue < 3)) {
                FacesMessage message = new FacesMessage("Y должен входить в диапазон (-3 ... 3)");
                throw new ValidatorException(message);
            }
        } catch (NumberFormatException e) {
            FacesMessage message = new FacesMessage( "Y должен быть числом");
            throw new ValidatorException(message);
        }
    }

}
