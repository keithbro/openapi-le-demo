/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/something/{id}": {
    put: operations["updateSomething"];
  };
}

export interface definitions {}

export interface operations {
  updateSomething: {
    parameters: {
      path: {
        id: number;
      };
      query: {
        hello: string;
        world: string;
      };
      body: {
        payload: {
          action: "create" | "update" | "delete";
        };
      };
      header: {
        /** Cookie */
        Cookie: string;
      };
    };
    responses: {
      /** 201 response */
      201: {
        schema: {
          id: number;
        };
      };
      /** 400 response */
      400: {
        schema: {
          error: string;
        };
      };
    };
  };
}