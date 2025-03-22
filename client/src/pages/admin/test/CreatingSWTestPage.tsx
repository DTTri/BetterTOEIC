import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import theme from "@/theme";

export default function CreatingSWTestPage() {
  return (
    <div className="creating-test-container">
      <h2 className="text-2xl font-bold">S&W Toeic Test</h2>
      <hr />
      <div className="w-1/2 items-start flex justify-start gap-4">
        <h3 className="text-xl font-semibold basis-1/3">Title:</h3>
        <input
          type="text"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          // disabled={isAllBlocked}
          placeholder="Typing the title"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1
      focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
      "
        />
      </div>
      <div className="w-1/2 items-start flex justify-start gap-4">
        <h3 className="text-xl font-semibold basis-1/3">Description:</h3>
        <textarea
          // value={description}
          // onChange={(e) => setDescription(e.target.value)}
          // disabled={isAllBlocked}
          placeholder="Typing the description"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
      <div className="w-full flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Speaking:</h3>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 1:</h4>
              <textarea
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the question"
                rows={6}
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 2:</h4>
              <textarea
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the question"
                rows={6}
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex gap-8">
              <h4 className="text-lg font-medium">Question 3:</h4>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleFileInputClick}
                // disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                Add image file
              </Button>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex gap-8">
              <h4 className="text-lg font-medium">Question 4:</h4>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleFileInputClick}
                // disabled={isAllBlocked}
                startIcon={<AddPhotoAlternateIcon />}
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                Add image file
              </Button>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-1">
              <h4 className="text-lg font-medium">Question 5-7:</h4>
              <div className="flex flex-col gap-2 p-2">
                <p className="text-lg font-medium">Context</p>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add audio file
                </Button>
                <textarea
                  // value={question}
                  // onChange={(e) => setQuestion(e.target.value)}
                  // disabled={isAllBlocked}
                  placeholder="Typing the question"
                  rows={4}
                  className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium min-w-fit">Question 5:</p>
                  <input
                    type="text"
                    // value={question}
                    // onChange={(e) => setQuestion(e.target.value)}
                    // disabled={isAllBlocked}
                    placeholder="Typing the question 5"
                    className="w-full border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium min-w-fit">Question 6:</p>
                  <input
                    type="text"
                    // value={question}
                    // onChange={(e) => setQuestion(e.target.value)}
                    // disabled={isAllBlocked}
                    placeholder="Typing the question 6"
                    className="w-full border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium min-w-fit">Question 7:</p>
                  <input
                    type="text"
                    // value={question}
                    // onChange={(e) => setQuestion(e.target.value)}
                    // disabled={isAllBlocked}
                    placeholder="Typing the question 7"
                    className="w-full border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-1">
              <h4 className="text-lg font-medium">Question 8-10:</h4>
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add Image file
                </Button>
                <textarea
                  // value={question}
                  // onChange={(e) => setQuestion(e.target.value)}
                  // disabled={isAllBlocked}
                  placeholder="Typing the question"
                  rows={4}
                  className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add Audio file
                </Button>
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>{" "}
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-1">
              <h4 className="text-lg font-medium">Question 11:</h4>
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    width: "fit-content",
                  }}
                >
                  Add Audio file
                </Button>
                <textarea
                  // value={question}
                  // onChange={(e) => setQuestion(e.target.value)}
                  // disabled={isAllBlocked}
                  placeholder="Typing the question"
                  rows={4}
                  className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Writing:</h3>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 1:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 2:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 3:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 4:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex gap-8">
                <h4 className="text-lg font-medium">Question 5:</h4>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleFileInputClick}
                  // disabled={isAllBlocked}
                  startIcon={<AddPhotoAlternateIcon />}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  Add image file
                </Button>
              </div>
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the keyword"
                className="w-60 border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 6:</h4>
              <textarea
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the question"
                rows={6}
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 7:</h4>
              <textarea
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the question"
                rows={6}
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
          <div className="w-full flex justify-between pr-4">
            <div className="basis-1/2 flex flex-col gap-2">
              <h4 className="text-lg font-medium">Question 8:</h4>
              <input
                type="text"
                // value={question}
                // onChange={(e) => setQuestion(e.target.value)}
                // disabled={isAllBlocked}
                placeholder="Typing the topic"
                className="border-2 border-black rounded-sm shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "fit-content",
                height: "fit-content",
                textTransform: "none",
              }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // setIsEditing(!isEditing);
              }}
              // disabled={isAllBlocked}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
