import clsx from 'clsx';

function CardItem({ className, children }) {
  return <div className={clsx('bg-primary rounded-4 p-16', className)}>{children}</div>;
}

export default CardItem;
