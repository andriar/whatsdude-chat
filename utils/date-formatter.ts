export function formatDateTime(date: string) {
  const today = new Date();
  const inputDate = new Date(date);

  const isToday = today.toDateString() === inputDate.toDateString();

  if (isToday) {
    return (
      'Today, ' +
      inputDate
        .toLocaleString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/\./g, ':')
    );
  }

  return inputDate
    .toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\./g, ':');
}