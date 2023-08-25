export const isSameSender = (messages, m, i, loggedUserId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].userId !== m.userId ||
        messages[i + 1].userId === undefined) &&
      messages[i].userId !== loggedUserId
    );
  };