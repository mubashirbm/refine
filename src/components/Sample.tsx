import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    MarkdownField,
    TagField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const SampleList: React.FC<IResourceComponentsProps> = () => {
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

    const { data: tagsData, isLoading: tagsIsLoading } = useMany({
        resource: "tags",
        ids: [].concat(
            ...(tableProps?.dataSource?.map((item) => item?.tags) ?? []),
        ),
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="content"
                    title="Content"
                    render={(value: any) => (
                        <MarkdownField value={value.slice(0, 80) + "..."} />
                    )}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
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
                    dataIndex="tags"
                    title="Tags"
                    render={(value: any[]) =>
                        tagsIsLoading ? (
                            <>Loading...</>
                        ) : (
                            <>
                                {value?.map((item, index) => (
                                    <TagField
                                        key={index}
                                        value={
                                            tagsData?.data?.find(
                                                (resourceItems) =>
                                                    resourceItems.id === item,
                                            )?.title
                                        }
                                    />
                                ))}
                            </>
                        )
                    }
                />
                <Table.Column
                    dataIndex={["createdAt"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
            </Table>
        </List>
    );
};
