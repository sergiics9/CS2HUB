import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Details = lazy(() => import('../../pages/details'));
const List = lazy(() => import('../list/list'));
const Login = lazy(() => import('../../pages/login'));
const Register = lazy(() => import('../../pages/register'));
const AddSkin = lazy(() => import('../../pages/add.skin'));
const ModifySkin = lazy(() => import('../../pages/modify.skin'));
const ErrorPage = lazy(() => import('../../pages/error'));

export function AppRoutes() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<List></List>}></Route>
          <Route path="/details/:id" element={<Details></Details>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/add-skin" element={<AddSkin></AddSkin>}></Route>
          <Route
            path="/modify-skin/:id"
            element={<ModifySkin></ModifySkin>}
          ></Route>
          <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
