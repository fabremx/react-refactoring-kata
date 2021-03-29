import { ReactElement } from "react";
import { Product } from "../../models";
import { CommonProduct } from "../commonProduct";
import { EndedProduct } from "../endedProduct";
import { NewProduct } from "../newProduct";
import { BaseProduct } from "../baseProduct";

interface Props {
  product: Product;
  removeProduct: (idToRemove: number) => void;
}

interface MappingKeyComponent {
  key: string;
  component: ReactElement;
}

export function ProductRow({ product, removeProduct }: Props): ReactElement {
  const getProductComponent = (product: Product): ReactElement => {
    const mappingKeyComponent: MappingKeyComponent[] = [
      { key: "isNew", component: <NewProduct title={product.title} /> },
      {
        key: "isSoonEnding",
        component: <EndedProduct image={product.image} title={product.title} />,
      },
    ];

    const mappedKeyComponent:
      | MappingKeyComponent
      | undefined = mappingKeyComponent.find(
      (mapping: MappingKeyComponent) => product[mapping.key]
    );

    if (mappedKeyComponent) return mappedKeyComponent.component;
    return <CommonProduct image={product.image} title={product.title} />;
  };

  return (
    <BaseProduct product={product} removeProduct={removeProduct}>
      {getProductComponent(product)}
    </BaseProduct>
  );
}
