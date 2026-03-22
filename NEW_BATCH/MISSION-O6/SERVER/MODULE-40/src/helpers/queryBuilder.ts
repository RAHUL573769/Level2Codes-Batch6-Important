import {
    IQueryConfig,
    IQueryParams,
    PrismaCountArgs,
    PrismaFindManyArgs,
    PrismaModelDelegate,
    PrismaStringFilter,
} from "../interfaces/queryInterface.js";

export class QueryBuilder<T> {
    private query: PrismaFindManyArgs = {};
    private countQuery: PrismaCountArgs = {};
    private page = 1;
    private limit = 10;

    constructor(
        private model: PrismaModelDelegate,
        private queryParams: IQueryParams,
        private config: IQueryConfig
    ) {
        this.query = {
            where: {},
            include: {},
            orderBy: undefined,
            skip: 0,
            take: 10,
        };

        this.countQuery = {
            where: {},
        };
    }

    // 🔍 SEARCH
    search(): this {
        const { searchTerm } = this.queryParams;
        const { searchableFields } = this.config;
        //doctorSearchableFields=["user.name","user.email"]
        if (searchTerm && searchableFields?.length && searchableFields) {

            const searchConditions: Record<string, unknown>[] =
                searchableFields.map((field) => {
                    if (field.includes(".")) {
                        const parts = field.split(".");
                        if (parts.length === 2) {
                            const [relation, nestedField] = parts

                            const stringFilter: PrismaStringFilter = {
                                contains: searchTerm,
                                mode: "insensitive" as const
                            }
                            return {
                                [nestedField]: stringFilter
                            }
                        } else if (parts.length === 3) {
                            const [relation, nestedRelation, nestedField] = parts


                            const stringFilter: PrismaStringFilter = {
                                contains: searchTerm,
                                mode: "insensitive" as const
                            }
                            return {
                                [relation]: {
                                    [nestedRelation]: {
                                        [nestedField]: stringFilter
                                    }
                                }
                            }
                        }
                    }
                })
            //direct fields
            const stringFilter: PrismaStringFilter = {

                contains: searchTerm,
                mode: "insensitive" as const
            }
            return { [field]: stringFilter }


        }

        return this;
    }

    // 🎯 FILTER
    // filter(): this {
    //     const queryObj = { ...this.queryParams };
    //     const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

    //     excludeFields.forEach((field) => delete queryObj[field]);

    //     this.query.where = {
    //         ...(this.query.where as object),
    //         ...queryObj,
    //     };

    //     this.countQuery.where = {
    //         ...(this.countQuery.where as object),
    //         ...queryObj,
    //     };

    //     return this;
    // }

    // 🔃 SORT
    // sort(): this {
    //     const { sort } = this.queryParams;

    //     if (sort) {
    //         const sortFields = sort.split(",").map((field) => {
    //             const order = field.startsWith("-") ? "desc" : "asc";
    //             const fieldName = field.replace("-", "");

    //             return {
    //                 [fieldName]: order,
    //             };
    //         });

    //         this.query.orderBy = sortFields;
    //     } else {
    //         this.query.orderBy = [{ createdAt: "desc" }];
    //     }

    //     return this;
    // }

    // 📄 PAGINATION
    // paginate(): this {
    //     const page = Number(this.queryParams.page) || 1;
    //     const limit = Number(this.queryParams.limit) || 10;

    //     const skip = (page - 1) * limit;

    //     this.page = page;
    //     this.limit = limit;

    //     this.query.skip = skip;
    //     this.query.take = limit;

    //     return this;
    // }

    // 🎨 FIELD SELECTION
    // fields(): this {
    //     const { fields } = this.queryParams;

    //     if (fields) {
    //         const selectedFields = fields.split(",").reduce((acc, field) => {
    //             acc[field.trim()] = true;
    //             return acc;
    //         }, {} as Record<string, boolean>);

    //         this.query.select = selectedFields;
    //     }

    //     return this;
    // }

    // 🔗 INCLUDE RELATIONS
    // include(includeObj: Record<string, boolean | object>): this {
    //     this.query.include = includeObj;
    //     return this;
    // }

    // 📊 EXECUTE QUERY
    // async execute() {
    //     const [data, total] = await Promise.all([
    //         this.model.findMany(this.query),
    //         this.model.count(this.countQuery),
    //     ]);

    //     return {
    //         meta: {
    //             page: this.page,
    //             limit: this.limit,
    //             total,
    //             totalPage: Math.ceil(total / this.limit),
    //         },
    //         data,
    //     };
    // }
}








