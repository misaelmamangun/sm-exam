import React, { useEffect, useState } from "react";
import { formatCurrency } from "../helpers/currency";
import Modal from "./Modal";
import { Product } from "../App";

type TTableList = {
  name: string;
  items: Product[];
};

type Config = {
  fields: Field[];
};

type Field = {
  id: keyof Product;
  type: string;
  title: string;
  currency?: string;
  child?: Field[];
  show: boolean;
};

const TableList: React.FC<TTableList> = ({ name, items }) => {
  const [config, setConfig] = useState<Config | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const previewProduct = (item: Product) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadItemConfig = async () => {
      const configData = await import(`./../schemas/${name}.json`);
      setConfig(configData);
    };

    loadItemConfig();
  }, [name]);

  const renderField = (field: Field, item: Product) => {
    switch (field.type) {
      case "image":
        return (
          <img
            src={item[field.id] as string}
            width={100}
            alt={field.title}
            loading="lazy"
            className="cursor-pointer"
            onClick={() => previewProduct(item)}
          />
        );
      case "currency":
        return field.currency
          ? formatCurrency(item[field.id] as number, field.currency)
          : item[field.id];
      case "string":
      default:
        return item[field.id];
    }
  };

  return (
    <>
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            {config?.fields.map((field, i) => (
              <th className="px-4 py-2 border" align="left" key={i}>
                {field.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items?.map((item, i) => (
            <tr key={i}>
              {config?.fields.map((field, i) => (
                <React.Fragment key={i}>
                  <td className="px-4 py-2 border">
                    {renderField(field, item)}
                    {field.child &&
                      field.child.map((childField, i) => (
                        <div key={i} style={{ marginTop: "8px" }}>
                          {renderField(childField, item)}
                        </div>
                      ))}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </>
  );
};

export default TableList;
