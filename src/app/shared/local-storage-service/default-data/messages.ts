import { IMessage } from 'src/app/shared/models/message';

export let messages: IMessage[] = [
    {
      text:
        "Donec at magna quis turpis faucibus placerat. Nam in erat non ipsum sodales lobortis vitae eget arcu. Aenean vel dignissim magna.",
      authorID: 1,
      recipientID: 2,
      timestamp: new Date(2020, 1, 2, 19, 22, 28).getTime(),
      isRead: true
    },
    {
      text:
        "Nunc congue, nulla et fringilla semper, ipsum augue lobortis dolor, eget interdum orci lorem at eros",
      authorID: 2,
      recipientID: 1,
      timestamp: new Date(2020, 1, 2, 19, 22, 55).getTime(),
      isRead: true
    },
    {
      text: "Aliquam vulputate scelerisque consequat.",
      authorID: 2,
      recipientID: 1,
      timestamp: new Date(2020, 1, 2, 19, 23, 3).getTime(),
      isRead: true
    },
    {
      text: "Aliquam tate scelerisque consequat vulpu.",
      authorID: 2,
      recipientID: 1,
      timestamp: new Date(2020, 1, 2, 19, 23, 34).getTime(),
      isRead: true
    },
    {
      text: "Aenean nec vulputate nisl.",
      authorID: 1,
      recipientID: 2,
      timestamp: new Date(2020, 1, 2, 19, 24, 9).getTime(),
      isRead: true
    },
    {
      text: "Sed egestas vel purus ut hendrerit. Nam ac venenatis dolor",
      authorID: 1,
      recipientID: 2,
      timestamp: new Date(2020, 1, 2, 19, 24, 48).getTime(),
      isRead: true
    },
    {
      text: "Aenean nec vulputate nisl",
      authorID: 1,
      recipientID: 5,
      timestamp: new Date(2020, 1, 2, 23, 24, 48).getTime(),
      isRead: false
    }
  ];