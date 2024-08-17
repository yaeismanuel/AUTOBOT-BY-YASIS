module.exports.config = {
  name: "antiout",
  version: "1.0.0"
};
module.exports.handleEvent = async ({
  event,
  api
}) => {
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
  if (event.logMessageData?.leftParticipantFbId) {
    const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
    const {
      name
    } = info[event.logMessageData?.leftParticipantFbId];
    api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
      if (error) {
        api.sendMessage(`Nag leave si ${name} sa group guys🥺!`, event.threadID);
      } else {
        api.sendMessage(`add kita, ${name} love kita eh!`, event.threadID);
      }
    });
  }
};
