import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { DataSource, DataSourceSchema, DataSourceType } from "@/models";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultProps = (dataSourceType: DataSourceType): DataSource => {
  return {
    authType: "PASSWORD",
    comment: "",
    dataBaseName: "",
    dataSourceType: dataSourceType,
    driverId: "",
    keepAlive: 0,
    name: "",
    password: "",
    port: 0,
    readonly: false,
    singleSessionMode: false,
    switchArchitecture: "auto",
    timeOut: 0,
    timezone: "",
    transactionControl: "auto",
    url: "",
    username: "",
    host: "localhost",
    connectionType: "default",
  };
};
type DatasourceFormProps = {
  dataSourceType?: DataSourceType;
  dataSourceId?: string;
  dataSourceProps?: DataSource;
  height: number;
  onSubmit: (data: any) => void;
};
export function DataSourceForm({
  dataSourceType,
  dataSourceId,
  dataSourceProps,
  height,
  onSubmit,
}: DatasourceFormProps) {
  const { t } = useTranslation("DatabaseBundle");

  const formSchema = DataSourceSchema(useTranslation("model"));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (!dataSourceId) {
      // fetch dataSourceProps;
    }
    form.reset(defaultProps(DataSourceType.MySQL));
  }, [form.reset]);
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4 flex h-full flex-1 flex-grow cursor-default flex-col space-y-3 font-inter text-small"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <NameField />
        <CommentField />
        <Tabs defaultValue="general" className="w-full flex-1">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="general">
              {t("database.driver.settings.general.tab")}
            </TabsTrigger>
            <TabsTrigger value="option">
              {t("database.driver.settings.options.tab")}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="general"
            className={"mt-1 w-full flex-1 gap-x-8 border-0"}
          >
            <GeneralTabContext />
          </TabsContent>
          <TabsContent value="option" className={"w-full flex-1"}>
            <ScrollArea
              className={"flex w-full flex-wrap pt-3"}
              style={{
                height: height,
              }}
            >
              <OptionTabContent />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </form>
    </FormProvider>
  );
}
function NameField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext(); // 获取 form 控制器
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="flex w-[500px] items-center space-x-4">
          <FormLabel className="w-[80px]">
            {t("property.FirstName.title")} :
          </FormLabel>
          <FormControl className="w-[250px]">
            <Input
              {...field}
              className="h-[26px] border leading-[26px]"
              tabIndex={-1} // using tabIndex avoid dialog focused when first change tabs;
            />
          </FormControl>
          <FormDescription className="w-[100px]">
            {t("action.DatabaseView.CreateDdlMapping.text")}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
function CommentField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="comment"
      render={({ field }) => (
        <FormItem className="flex w-[500px] items-center space-x-4">
          <FormLabel className="w-[80px]">
            {t("DatabaseObjectCommentEditor.comment")} :
          </FormLabel>
          <FormControl className="w-[250px]">
            <Input
              {...field}
              className="h-[26px] border leading-[26px]"
              tabIndex={-1} //using tabIndex avoid dialog focused when first change tabs;
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function ConnectionTypeField() {
  const { t } = useTranslation("DatabaseBundle");

  const { control } = useFormContext(); // 获取 form 控制器
  return (
    <>
      <FormField
        control={control}
        name="connectionType"
        render={({ field }) => (
          <FormItem className="my-3 flex w-2/5 items-center space-x-4">
            <FormLabel className="w-[80px]">
              {t("data.source.editor.connection.type.label")}
            </FormLabel>
            <div className="h-full flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-[26px] p-0 pl-2">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">default</SelectItem>
                  <SelectItem value="In-Memory">In-Memory</SelectItem>
                  <SelectItem value="URL only">URL only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function HostPortField() {
  const { t } = useTranslation("DatabaseBundle");

  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="host"
        render={({ field }) => (
          <FormItem className={"my-3 flex flex-grow items-center space-x-4"}>
            <FormLabel className="w-[80px]">
              {t("property.Host.title") + " :"}
            </FormLabel>
            <FormControl className="flex-1">
              <Input {...field} className="h-[26px] border leading-[26px]" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="port"
        render={({ field }) => (
          <FormItem className={"my-3 flex w-1/5 items-center space-x-4 pl-2"}>
            <FormLabel className="w-[40px]">
              {t("TypeDescriptor.param.port") + " :"}
            </FormLabel>
            <FormControl className="flex-1">
              <Input {...field} className="h-[26px] border leading-[26px]" />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

function AuthTypeField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="authType"
      render={({ field }) => (
        <FormItem className={"my-3 flex w-full items-center space-x-4"}>
          <FormLabel className="w-[80px]">{t("authentication.type")}</FormLabel>
          <FormControl className="flex-1">
            <Input {...field} className="h-[26px] border leading-[26px]" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function UserNameField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem className={"my-3 flex w-4/5 items-center space-x-4"}>
            <FormLabel className="w-[80px]">
              {t("database.auth.user.label")}
            </FormLabel>
            <FormControl className="flex-1">
              <Input
                {...field}
                className="h-[26px] border leading-[26px]"
                type={"text"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function PasswordField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem className={"my-3 flex w-4/5 items-center space-x-4"}>
            <FormLabel className="w-[80px]">
              {t("property.Password.title") + " :"}
            </FormLabel>
            <FormControl className="flex-1">
              <Input
                {...field}
                className="h-[26px] border leading-[26px]"
                type={"password"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function DataBaseNameField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="dataBaseName"
      render={({ field }) => (
        <FormItem className={"my-3 flex w-full items-center space-x-4"}>
          <FormLabel className="w-[80px]">
            {t("advanced.settings.database") + " :"}
          </FormLabel>
          <FormControl className="flex-1">
            <Input {...field} className="h-[26px] border leading-[26px]" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function URLField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="url"
      render={({ field }) => (
        <FormItem className={"my-3 flex w-full items-center space-x-4"}>
          <FormLabel className="w-[80px]">
            {t("data.source.editor.url.label")}
          </FormLabel>
          <FormControl className="flex-1">
            <Input {...field} className="h-[26px] border leading-[26px]" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function GeneralTabContext() {
  return (
    <div className={"flex h-full w-full flex-wrap"}>
      <ConnectionTypeField />
      <HostPortField />
      <AuthTypeField />
      <UserNameField />
      <PasswordField />
      <DataBaseNameField />
      <URLField />
    </div>
  );
}

function OptionTabContent() {
  const { t } = useTranslation("DatabaseBundle");
  return (
    <>
      <div className={"flex h-[26px] w-full items-center"}>
        <div className={"mr-2 h-6 w-auto"}>
          {t("data.source.connection.title")}
        </div>
        <Separator className={"h-[1px] flex-1 bg-[var(--gray-4)]"} />
      </div>
      <ReadOnlyField />
      <TransactionControlField />
      <SwitchArchitectureField />
      <TimeZoneField />
      <SingleSessionModeField />
      <KeepAliveField />
      <TimeOutField />
    </>
  );
}

function ReadOnlyField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="readOnly"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange} // 确保 onChange 处理 boolean 值
              />
            </FormControl>
            <FormLabel className="text-sm">
              {t("data.source.read.only.label")}
            </FormLabel>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}
function TransactionControlField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="transactionControl"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex w-[200px] items-center space-x-4">
            <FormLabel className="w-[80px]">
              {t("data.source.transaction.control.label")}
            </FormLabel>
            <div className="h-full flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-[26px] p-0 pl-2">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className={"pl-1"}>
                      {t("transaction.mode")}
                    </SelectLabel>
                    <SelectItem value="auto">
                      {t("transaction.mode.auto")}
                    </SelectItem>
                    <SelectItem value="manual">
                      {t("transaction.mode.manual")}
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className={"pl-1"}>
                      {t("action.transaction.isolation.text")}
                    </SelectLabel>
                    <SelectItem value="transactionIsolationDefault">
                      {t("transaction.mode.database.default")}
                    </SelectItem>
                    <SelectItem value="transactionReadUncommit">
                      {t("transaction.mode.read.committed")}
                    </SelectItem>
                    <SelectItem value="transactionReadCommited">
                      {t("transaction.mode.read.uncommitted")}
                    </SelectItem>
                    <SelectItem value="transaction.mode.repeatable.read">
                      {t("transactionRepeatRead")}
                    </SelectItem>
                    <SelectItem value="transactionSequence">
                      {t("transaction.mode.serializable")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function SwitchArchitectureField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="switchArchitecture"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex w-[200px] items-center space-x-4">
            <FormLabel className="w-[80px]">
              {t("data.source.switch.schema.label")}
            </FormLabel>
            <div className="h-full flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-[26px] p-0 pl-2">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="auto">
                    {t("data.source.settings.options.schema.switch.auto")}
                  </SelectItem>
                  <SelectItem value="manual">
                    {t("data.source.settings.options.schema.switch.manual")}
                  </SelectItem>
                  <SelectItem value="disabled">
                    {t("data.source.settings.options.schema.switch.disabled")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function TimeZoneField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="timezone"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex w-[200px] items-center space-x-4">
            <FormLabel className="w-[80px]">
              {t("data.source.time.zone.label")}
            </FormLabel>
            <div className="h-full flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-[26px] p-0 pl-2">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Intl.supportedValuesOf("timeZone").map((timezone, index) => (
                    <SelectItem value={timezone} key={index}>
                      {timezone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function SingleSessionModeField() {
  const { t } = useTranslation("DatabaseBundle");

  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="singleSessionMode"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-sm">
              {t("data.source.single.session.mode.label")}
            </FormLabel>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}
function KeepAliveField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="keepAlive"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange} // 确保 onChange 处理 boolean 值
              />
            </FormControl>
            <FormLabel className="text-sm">
              {t("data.source.keep.alive.label")}
            </FormLabel>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}

function TimeOutField() {
  const { t } = useTranslation("DatabaseBundle");
  const { control } = useFormContext();
  const [checked, setChecked] = useState(false);
  return (
    <>
      <FormField
        control={control}
        name="timeout"
        render={({ field }) => (
          <FormItem className="my-3 ml-8 flex items-center space-x-2">
            <FormLabel>
              <Checkbox
                id="timeout"
                checked={checked}
                onCheckedChange={(checked) => setChecked(!!checked)}
              />
            </FormLabel>
            <FormLabel className="text-sm">
              {t("data.source.auto.disconnect.label")}
            </FormLabel>
            <FormControl>
              <Input
                id="timeout"
                readOnly={!checked}
                {...field}
                className={"h-[26px] w-[80px] border leading-[26px]"}
              />
            </FormControl>
            <FormLabel className="text-sm">
              {t("DataSourceOptionsPanel.sec")}
            </FormLabel>
          </FormItem>
        )}
      />
      <div className={"w-full"} />
    </>
  );
}
