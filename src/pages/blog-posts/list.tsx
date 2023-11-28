import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate,
    useMany,
} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    MarkdownField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "categories",
        ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title={translate("blog_posts.fields.id")}
                />
                <Table.Column
                    dataIndex="title"
                    title={translate("blog_posts.fields.title")}
                />
                <Table.Column
                    dataIndex="content"
                    title={translate("blog_posts.fields.content")}
                    render={(value: any) => (
                        <MarkdownField value={value.slice(0, 80) + "..."} />
                    )}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title={translate("blog_posts.fields.category")}
                    render={(value) =>
                        categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            categoryData?.data?.find(
                                (item) => item.id === value,
                            )?.title
                        )
                    }
                />
                <Table.Column
                    dataIndex="status"
                    title={translate("blog_posts.fields.status")}
                />
                <Table.Column
                    dataIndex={["createdAt"]}
                    title={translate("blog_posts.fields.createdAt")}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title={translate("table.actions")}
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
