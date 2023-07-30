This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Front End Deployment -

    Download source code
    Open your IDE. (Example. Visual Studio)
    Navigate the source code folder
    Run command below in a terminal in your IDE, depending on your package manager.
    There are no ENV required.

    ```bash
    npm install
    # or
    yarn install
    ```

    Run command below

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Setup backend below

    Once backend is setup then open http://localhost:3000 with your browser to see the result.

## Back End Deployment

    Download via https://dev.mysql.com/downloads/workbench/
    Go thorough installation process -

# Requires

user: root password: svz1

# Note -

If you wish to use another user/password the details can be changed in libs/mysqlDB.js in the front end folder.

    Click Server on the main tool bar.
    Select Data Import.
    The file is located within the front end folder above.
    Navigate the source to the front end folder/sql.
    Select all the files within the folder to load, and click OK.
