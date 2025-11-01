import { AutoComplete, Input, Typography } from "antd"
const { Title } = Typography;

export const AreaPesquisaProdutos = () => {
  return (
    <>
      <Title level={2}>Transforme sua sala de aula com encanto</Title>
      <AutoComplete
        popupMatchSelectWidth={252}
        style={{ width: 350 }}
      // options={options}
      // onSelect={onSelect}
      // onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="O que você quer encontrar hoje?" enterButton />
      </AutoComplete>
    </>
  )
}