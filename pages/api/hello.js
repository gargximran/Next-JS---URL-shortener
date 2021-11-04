import connection from "../../core/db/connection";
import URLDirectoryModel from "../../core/db/models/URLDirectoryModel";


export default async function helloAPI(req, res) {
  await connection();
  const m = await URLDirectoryModel.create({url: 'isfldmsdflsdkf', slug: 'sldfkjsdfldsjf'})
  console.log(m)


  res.status(200).json({ name: 'John Doe' })
}
