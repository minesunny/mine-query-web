const SQLEditorBar: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  const [databaseList, setDatabaseList] = useState(["a", "b", "c", "d"]);
  const [schemaList, setSchemaList] = useState(["a", "b", "c", "d"]);
  return (
    <div className="h-[26px] w-full flex py-[1px] border-0">
      <Select
        onValueChange={(value) => {
          updateSQLEditor(editorId, {
            dataBaseName: value,
            schemaName: "",
          });
        }}
      >
        <SelectTrigger className="w-[180px] h-[24px] editor-bar-select">
          <SelectValue placeholder="数据库" />
        </SelectTrigger>
        <SelectContent className="editor-bar-select">
          {databaseList.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="h-[24px] focus:outline-none"
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          updateSQLEditor(editorId, {
            schemaName: value,
          });
        }}
      >
        <SelectTrigger className="w-[180px] h-[24px]">
          <SelectValue placeholder="模式" />
        </SelectTrigger>
        <SelectContent>
          {schemaList.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="h-[24px] focus:outline-none"
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Button className={"h-5 w-5 p-0 my-auto mx-4"}>
        <Pause className={"hidden"} />
        <Play className={"block"} />
      </Button>
    </div>
  );
};
