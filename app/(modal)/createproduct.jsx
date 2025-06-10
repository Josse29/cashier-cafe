import CreateProduct from "../../src/features/product/CreateProduct";
import { KeyboardAvoidingComponent } from "../../src/components";

const ModalCreateProduct = () => {
  return (
    <KeyboardAvoidingComponent>
      <CreateProduct />
    </KeyboardAvoidingComponent>
  );
};

export default ModalCreateProduct;
