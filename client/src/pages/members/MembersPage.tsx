import { Navigate, Route, Routes } from "react-router-dom";

import MemberCreate from "./MemberCreate";
import MembersAll from "./MembersAll";

export default function MembersPage() {
  return (
    <>
      <Routes>
        <Route>
          <Route path='' element={<MembersAll />}  />
          <Route path='/create' element={<MemberCreate />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  )
}
