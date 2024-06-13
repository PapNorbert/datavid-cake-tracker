import { Navigate, Route, Routes } from "react-router-dom";

import MemberCreate from "./MemberCreate";

export default function MembersPage() {
  return (
    <>
      <Routes>
        <Route>
          <Route path='/create' element={<MemberCreate />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  )
}
