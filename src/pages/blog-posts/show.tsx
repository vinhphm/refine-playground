import React from "react";
import {
    IResourceComponentsProps,
    useShow,
    useTranslate,
    useOne,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    MarkdownField,
    DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>{translate("blog_posts.fields.id")}</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>{translate("blog_posts.fields.title")}</Title>
            <TextField value={record?.title} />
            <Title level={5}>{translate("blog_posts.fields.content")}</Title>
            <MarkdownField value={record?.content} />
            <Title level={5}>{translate("blog_posts.fields.category")}</Title>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.title}</>
            )}
            <Title level={5}>{translate("blog_posts.fields.status")}</Title>
            <TextField value={record?.status} />
            <Title level={5}>{translate("blog_posts.fields.createdAt")}</Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
