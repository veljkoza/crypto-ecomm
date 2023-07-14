import Router from "next/router";
export const Routes = {
  admin: {
    products: {
      edit: {
        link: "/admin/products/edit",
        push: function (id: string) {
          void Router.push(`${this.link}/${id}`);
        },
        replace: function (id: string) {
          void Router.replace(`${this.link}/${id}`);
        },
      },
      add: {
        link: "/admin/products/add",
        push: function () {
          void Router.push(`${this.link}`);
        },
        replace: function () {
          void Router.replace(`${this.link}`);
        },
      },
    },
  },
};
