import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth, isAdmin } from '../../../utils/auth';
const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate('user', 'name');
  await db.disconnect();
  res.send(orders);
});

export default handler;
